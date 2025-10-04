// Show whether the library loaded
const statusEl = document.getElementById('status');
const outputEl = document.getElementById('output');

function setStatus(msg, cls="muted"){ statusEl.className = cls; statusEl.textContent = msg; }
const $ = id => document.getElementById(id);

// Your public key (exactly as provided)
const PUBKEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBGjgzEoBCAC1f7v296odbZkd/1YcRWq5nF89vcbgssfwTUn/ljpmWA4fbTew
gqVI1My8FQfaeAKNK6ItMDy6bX9H3Ks6cwYT/sMbI3qX9bl6TgpL3cSLsclLwhv+
ilhRTPkEt1d1VoiWpKFNdYme32D4mUQ7bkGSkLBLUvQuhhXlmVz6Oz/4W/0lSXYS
mABUPPr/VVTYIOCPkUsxO35YmoOZFohZSBwjNo0qA4huMlle+mKYiYu/ApE1Yl+B
BAFITuafDD8hJyXnQVsIY4M79kNP0mef9hxJLkV/RL0IN+D6pD8/0Gn9/FO755eg
Com6UQUbmvJUy7c4h64p4uCcs51liUME2t2RABEBAAG0QlRoZSBSZWFzb25hYmxl
IEFkanVzdG1lbnQgPGFkdm9jYWN5QHRoZXJlYXNvbmFibGVhZGp1c3RtZW50LmNv
LnVrPokBTgQTAQgAOBYhBMwbkJWq1QzDjLZ8QrbuO4b5qZmJBQJo4MxKAhsDBQsJ
CAcCBhUKCQgLAgQWAgMBAh4BAheAAAoJELbuO4b5qZmJgQsIAKMqO7Lc4ytTC93r
nnJyJR/vtk/+IRiOCMf5mdyqB3fcUzFbvsTN1t7Ybl8eUITOqKW67SpVUrN6LmqK
bvKb4mcE6tNE9iWXm7dVNzmmKRm5dgWRYXrtcfLz5h2BpqyxQ08ZQTCyBvOmXDG7
JS7BSCo+GNMEjxf4zYg/dkdJI3IXWtRLW3Ul1kLo/pennKe99D6arYQJyMQp/pUF
O6WfWCCUxuYnTbafJVhUpxxvgr5ss+dEfxKUTicHWN310h5QK3Si1R6fcvyawxh1
0Rtxz5Ng4I/pohlXtAUw7rB2NnPqlLADcsyPFrkMslhQ+FLyp1BvCXeRSXef8Mj3
eiu1joS5AQ0EaODMSgEIAMmGeDOV+psOf1XakNqDZackakFn9n3braG0GemtMsSK
qBaN86wRVJ4Wm+OkxkDnX6WdH7FZvwAA0qDylRdgXwyLlaHTPtMkvSYDMBLd/Ejb
0kOAng3s0WXMgHmM2IPAg9WA6/jBANFAtJT5a5qxQnFtVPhh3yi/y6KSPdbW3PyY
KpPA030kGFULX6N/4M+TZx09rONJsTtqGPOUl7kpYjLydy1yGT1PIvnDcvq8h3Gm
ONlBp3X89g7MGefkozqNSc+hwKXLw3Chn2sOWi8KDf4E4+m0E2p9eF6tylew9tjV
ZYM1rPb+QPgll3ifY2mhMMzeQP0AOcNN1y2vllzPz0cAEQEAAYkBNgQYAQgAIBYh
BMwbkJWq1QzDjLZ8QrbuO4b5qZmJBQJo4MxKAhsMAAoJELbuO4b5qZmJRBcH/ji8
ynCJVBxFAzMUc96krzlfbLo8oJmImmy19oUWvqDHW626kgveZPfjvtQc+iGqhQd9
iJG2IB2yRic2jqvQvqiGccxaKHKND6oTlyW4q9dwZaaTUvtshulICBeIpknyeFB0
sXaUEwcm/XcjtnB+IH6+kZemAWPLrT9gofw/puUnLbmbPv57cu42ocEsw9tJl4gG
Pg9BuLPTkDIjBKHD9UK+rCf8/CrP457cFH0XmojoepPNn/YA6V+cvqaz31IwK+bO
qXw+ZNmwYqEHxo9jqzsA2HrkzBvPtlZdGzzUGzWyH75kQAPI9MNL89xqqb6XoqVu
oDIDOw3/+G60wWUgwHE=
=u8MU
-----END PGP PUBLIC KEY BLOCK-----`;

function libraryReady(){
  if (window.openpgp) { setStatus('Encryption library loaded. Ready.', 'success'); }
  else { setStatus('OpenPGP library did not load. Check CSP/CDN/Cloudflare.', 'error'); }
}
document.addEventListener('DOMContentLoaded', libraryReady);

async function encryptText(plain){
  const publicKey = await openpgp.readKey({ armoredKey: PUBKEY });
  const message   = await openpgp.createMessage({ text: plain });
  return await openpgp.encrypt({ message, encryptionKeys: publicKey });
}

// Buttons
$('encryptBtn').addEventListener('click', async () => {
  const follow = $('follow').value.trim();
  const body   = $('message').value.trim();
  if (!body) { setStatus('Please write your report before encrypting.', 'error'); return; }
  setStatus('Encrypting in your browser, please wait...');

  try{
    const payload  = (follow ? `[Follow up code: ${follow}]\n\n` : '') + body;
    const armored  = await encryptText(payload);
    outputEl.textContent = armored;
    setStatus('Encrypted. Copy or download, then email it to whistleblower@thereasonableadjustment.co.uk', 'success');
  }catch(err){
    setStatus('Encryption error: ' + err.message, 'error');
  }
});

$('copyBtn').addEventListener('click', async () => {
  const text = outputEl.textContent.trim();
  if (!text || text === 'Nothing yet...'){ setStatus('Nothing to copy. Encrypt first.', 'error'); return; }
  try { await navigator.clipboard.writeText(text); setStatus('Encrypted text copied to clipboard.', 'success'); }
  catch { setStatus('Copy failed. Select the text and copy manually.', 'error'); }
});

// Use data: URL for download so we don't need blob: in CSP
$('downloadBtn').addEventListener('click', () => {
  const text = outputEl.textContent.trim();
  if (!text || text === 'Nothing yet...'){ setStatus('Nothing to download. Encrypt first.', 'error'); return; }
  const url = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  const ts  = new Date().toISOString().replace(/[:.]/g,'-');
  const a   = document.createElement('a');
  a.href = url; a.download = `trsa-whistle-${ts}.asc`;
  document.body.appendChild(a); a.click(); a.remove();
  setStatus('Downloaded .asc file. Email it to whistleblower@thereasonableadjustment.co.uk', 'success');
});

$('clearBtn').addEventListener('click', () => {
  $('message').value = ''; $('follow').value = '';
  outputEl.textContent = 'Nothing yet...';
  setStatus('Cleared.');
});
