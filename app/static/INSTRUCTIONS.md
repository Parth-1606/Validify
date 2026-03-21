# How to Add Background Image to Login Page

## Steps:

1. **Save your image file** (the desk setup image with laptop, charts, notebook)
2. **Name it:** `background.jpg` (or `background.png`, `background.jpeg`, `background.webp`)
3. **Place it in this folder:** `app/static/background.jpg`

## Supported Formats:
- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Recommended Image Size:
- **1920x1080** or larger for best quality
- The image will be automatically scaled to cover the entire background

## After Adding the Image:
1. Save the image file in `app/static/` folder
2. Refresh your browser
3. The image will appear as the background with a dark overlay for text readability

## If the Image Doesn't Appear:
- Make sure the filename is exactly `background.jpg` (case-sensitive)
- Check that the file is in the `app/static/` folder
- Try refreshing the browser with Ctrl+F5 (hard refresh)
- Check the browser console for any errors

## Alternative Filename:
If you want to use a different filename, update line 88 in `auth.py`:
```python
url('app/static/your-image-name.jpg')
```
