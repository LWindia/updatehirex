# Vercel Deployment Guide

## Environment Variables Setup

You need to set up environment variables in your Vercel dashboard:

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

```
EMAIL_USER=technical@lwindia.com
EMAIL_PASSWORD=eohq wlwi dgbd svxk
```

## Deployment Steps

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment"
   git push
   ```

2. **Vercel will automatically deploy** when you push to main branch

3. **Check the deployment logs** in Vercel dashboard

## Troubleshooting

### If you still get runtime errors:

1. **Check Vercel Function Logs** in the dashboard
2. **Make sure environment variables are set**
3. **Verify the API endpoint** is working

### Test the deployed API:

Once deployed, test your API endpoint:
```
https://your-vercel-app.vercel.app/api/test
```

This should return: `{"message": "API is working!", "timestamp": "..."}`

## Local vs Production

- **Local**: Uses `server.js` on port 3001
- **Production**: Uses `api/send-email.ts` on Vercel

Both should work the same way! 