# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(
    ['Crawling.py'],
    pathex=[],
    binaries=[],
    datas=[],
    hiddenimports=['selenium.webdriver.chrome.service', 'webdriver_manager.chrome', 'selenium', 'selenium.webdriver.chrome.options', 'selenium.webdriver.common.by', 'pandas', 'tqdm.notebook', 'wordcloud', 'matplotlib.pyplot', 'collections', 'importlib_resources.trees', 'konlpy.tag', 'konlpy', 'webdriver_manager', 'wordcloud'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='Crawling',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='Crawling',
)
