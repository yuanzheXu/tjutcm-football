#!/usr/bin/env python
"""把思源黑体/宋体按本页实际用到的字裁成子集，输出到 assets/fonts/。

为什么要裁：完整中文字体有 5-10MB，直接放网页上太重。
本页只用到两三百个不同的字，裁完每个字体只有 100KB 左右。

什么时候要重跑：改了 data/league.js 里的队名，或者改了 index.html 里的文案
（比如加了新的汉字）之后。不跑也不会出错 —— 子集里没有的字会自动回退到
系统字体，只是那一个字和别的字长得不太一样。

用法：
    python tools/subset_fonts.py

依赖：fonttools + brotli（pip install fonttools brotli）
"""

import hashlib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "fonts"

# 字体源文件：先找系统字体目录，找不到就改这里
FONTS = [
    ("C:/Windows/Fonts/NotoSansSC-VF.ttf", "noto-sans-sc.woff2"),
    ("C:/Windows/Fonts/NotoSerifSC-VF.ttf", "noto-serif-sc.woff2"),
]

# 页面里会出现汉字/字符的文件
SOURCES = ["index.html", "data/league.js"]

# 宋体只用在几个标题上（.hero__copy h1 / .head h2 / .round__name），
# 所以单独给它一个很小的字符集，能从 124KB 压到 10KB 以内。
# 改标题文案后如果这几个字没补进来，它会回退到系统宋体 —— 有的手机上没有中文宋体，
# 那几个字就会显示成方块。改了标题就顺手补一下这里。
SERIF_CHARS = "天津中医药大学足球联赛积分榜程与结果第轮进球失射手0123456789 　·—"

# 除正文之外还要保证有的字符（数字、英文字母、常见标点）
EXTRA = (
    "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789"
    " .,:;!?()[]{}<>/\\|-_=+*&%#@~$^`\"'"
    "·—–…、。，；：！？（）《》「」【】"
)


def collect_chars(full: bool) -> str:
    """full=True 收全页字符（给黑体用）；False 只收标题字符（给宋体用）。"""
    if not full:
        return "".join(sorted(set(SERIF_CHARS)))

    chars = set(EXTRA)
    for rel in SOURCES:
        p = ROOT / rel
        if not p.exists():
            sys.exit(f"找不到 {p}")
        chars |= set(p.read_text(encoding="utf-8"))
    chars = {c for c in chars if c.isprintable() or c == " "}
    return "".join(sorted(chars))


def version_css() -> None:
    """给 style.css 里的字体 URL 打上内容指纹（?v=xxxxxxxx）。

    不做这件事会踩一个很隐蔽的坑：字体文件名不变，浏览器就一直用缓存里的旧版本。
    重新裁剪后新增的字（比如新队名、新标题）在旧缓存里没有，只能回退到系统字体，
    表现成"某几个字跟别的字长得不一样"，而且刷新也没用。带上指纹后，
    字体一变 URL 就变，缓存自然失效。
    """
    css_path = ROOT / "assets" / "style.css"
    css = css_path.read_text(encoding="utf-8")

    digests = {}
    for _, out_name in FONTS:
        p = OUT_DIR / out_name
        if p.exists():
            digests[out_name] = hashlib.sha256(p.read_bytes()).hexdigest()[:8]

    def repl(m):
        name = m.group(1)
        v = digests.get(name)
        return f'url("fonts/{name}?v={v}")' if v else m.group(0)

    new = re.sub(r'url\("fonts/([^"?]+)(?:\?v=[^"]*)?"\)', repl, css)
    if new != css:
        css_path.write_text(new, encoding="utf-8")
        print("  已更新 style.css 里的字体指纹")
    else:
        print("  style.css 里的字体指纹无需变动")


def main() -> None:
    try:
        from fontTools.subset import main as subset_main
    except ImportError:
        sys.exit("没装 fonttools：pip install fonttools brotli")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for src, out_name in FONTS:
        if not Path(src).exists():
            print(f"  跳过（找不到源字体）：{src}")
            continue

        text = collect_chars(full=out_name.startswith("noto-sans"))
        text_file = OUT_DIR / "_chars.txt"
        text_file.write_text(text, encoding="utf-8")

        out = OUT_DIR / out_name
        subset_main([
            src,
            f"--text-file={text_file}",
            "--flavor=woff2",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
            f"--output-file={out}",
        ])
        text_file.unlink()
        print(f"  {out_name}  {len(text)} 字  {out.stat().st_size / 1024:.0f} KB")

    version_css()
    print("完成。")


if __name__ == "__main__":
    main()
