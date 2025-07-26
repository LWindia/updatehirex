# Email Setup Guide for HIREX Form

## Quick Fix Steps

### 1. Create Environment File
Create a `.env` file in your project root with:
```
EMAIL_USER=technical@lwindia.com
EMAIL_PASSWORD=eohq wlwi dgbd svxk
```

### 2. Test Email Configuration
Run the test script to verify your email setup:
```bash
node test-email.js
```

### 3. Start Your Server
Make sure both your frontend and backend are running:
```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend
npm run dev
```

## What I Fixed

### ✅ Backend Improvements
- **Better Error Handling**: More specific error messages
- **Connection Verification**: Tests email connection before sending
- **Improved Logging**: Detailed logs for debugging
- **Timeout Settings**: Prevents hanging requests
- **Better Email Format**: Professional HTML email template

### ✅ Frontend Improvements
- **Loading States**: Shows "Sending..." while submitting
- **Better Error Messages**: Specific error alerts
- **Form Validation**: Prevents empty submissions
- **Console Logging**: Helps with debugging

### ✅ Configuration Fixes
- **Fixed API Endpoint**: Both server.js and api/send-email.ts now use `/api/send-email`
- **Fixed Proxy**: Vite proxy now correctly routes to your local server
- **Environment Variables**: Proper fallback to hardcoded values

## Troubleshooting

### If emails still don't work:

1. **Check Console Logs**: Look for error messages in your terminal
2. **Test Email Script**: Run `node test-email.js` to test credentials
3. **Gmail Settings**: Make sure 2FA is enabled and app password is correct
4. **Network Issues**: Check if your server is running on port 3001

### Common Error Messages:
- `EAUTH`: Authentication failed - check email/password
- `ECONNECTION`: Connection failed - check internet/port
- `ETIMEDOUT`: Timeout - try again

## Next Steps

1. Create the `.env` file
2. Test with `node test-email.js`
3. Start your server with `npm run server`
4. Try submitting the form
5. Check your email inbox

The form should now work properly and send emails to `technical@lwindia.com`! 

You're seeing `GET /` on `localhost:3001`—this is **not an error**!  
It simply means your Express backend is running, but you haven't defined a route for `/`, so it just shows the default message.

**This is normal for an API server.**  
Your backend is ready to receive API requests (like `/api/send-email`), but if you visit the root URL in your browser, it just shows `GET /`.

---

## What to do next

1. **Test your form** on the frontend (http://localhost:5173 or wherever your Vite app runs).
2. **Or test the email script**:
   ```bash
   node test-email.js
   ```
3. If you want a friendly message at `/`, you can add this to your `server.js`:
   ```js
   app.get('/', (req, res) => {
     res.send('HIREX API Server is running!');
   });
   ```

---

**Summary:**  
- Your backend is running fine.
- The message is not an error.
- Now test your form or the email script.

If you get any errors when submitting the form or running the test script, please copy the error message here and I’ll help you fix it! 