# Vercel Deployment Fix Guide

## What I Fixed

1. **Converted TypeScript to JavaScript**: Changed `api/send-email.ts` to `api/send-email.js`
2. **Simplified Vercel Config**: Removed unnecessary build settings
3. **Added CORS Headers**: To handle cross-origin requests
4. **Created Test API**: `api/test.js` to verify deployment works

## Next Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "fix: convert API to JavaScript for Vercel compatibility"
git push
```

### 2. Wait for Vercel Deployment
- Vercel will automatically deploy when you push
- Check the deployment status in your Vercel dashboard

### 3. Test the APIs
After deployment, test these URLs:

**Test API:**
```
https://www.lwhirex.com/api/test
```
Should return: `{"message": "API is working!", "timestamp": "..."}`

**Email API:**
```
https://www.lwhirex.com/api/send-email
```
Should return: `{"success": false, "message": "Method Not Allowed"}` (because it's POST-only)

### 4. Test Your Form
- Go to https://www.lwhirex.com
- Fill out the form and submit
- Check your email at `technical@lwindia.com`

## Environment Variables
Make sure these are set in Vercel dashboard:
```
EMAIL_USER=technical@lwindia.com
EMAIL_PASSWORD=eohq wlwi dgbd svxk
```

## Troubleshooting
If you still get errors:
1. Check Vercel function logs
2. Test `/api/test` first
3. Make sure environment variables are set
4. Check that nodemailer is in dependencies

The form should now work perfectly! 🚀 