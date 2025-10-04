Important Setup Notice

The files in this repo are set up with my own PGP public key and my own whistleblower email address.
If you use these files as-is, your encrypted messages will go to me, not to you.

You MUST do the following before putting this on your own website:

Replace the PGP public key in the JavaScript file (wb.js) with your own public key.

Never use anyone else’s key for your own reports.

Never ever share your private key (the secret key that lets you decrypt messages). Only the public key goes in the code.

Change the email address everywhere it appears (like in whistleblower.html) to your own tipline email.

Quick Safety Rules

DO NOT use my PGP private key.

DO NOT ever share your private key with anyone.

DO NOT publish your private key online, in this repo, or anywhere public.

Only your public key belongs in the website code or in any public place.

Summary:

Edit wb.js: Swap in your own PGP public key block.

Edit whistleblower.html: Update the destination email.

Deploy only after you’ve done both.

If you need help generating your own key or updating the files, see the layman’s guide in this repo or contact me directly.

Why is this important?
If you use my public key, only I can read the encrypted messages — not you.
If you accidentally share your private key, anyone can read all the secrets sent to you.

Always keep your private key safe, and only use your own public key for your whistleblower tool.