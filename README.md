# SecureTextDiff

A simple, secure, client-side tool for comparing secret keys and sensitive strings at the character level. All processing happens locally in your browser — no data is ever sent to a server.

## Use Case

- Verify secret key rotations
- Compare API keys across environments
- Debug character-by-character differences in sensitive strings
- Check token or password changes

## Deployment

1. Go to **Settings** > **Pages** in your GitHub repository
2. Select **Source** as **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Click **Save**

Your site will be available at: `https://<username>.github.io/<repository-name>/`

## Files

- `index.html` - Complete application (HTML, CSS, JS)
- `.nojekyll` - Disables Jekyll processing for GitHub Pages
