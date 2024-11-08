# Curator AI - Newsletter Mail Agent

Mailing part of the Newsletter. Uses the curate agent to generate the content and formats the data to send it in an email. 

## Send a sample email

First, define the POSTMARK_API_KEY and DEFAULT_POSTMARK_MAIL in .env

Make sure you have dependencies installed :
```sh
make install
```

Send a sample email from the root of the project :
```sh
make testMail
```

The mail will be sent to the mail you defined in DEFAULT_POSTMARK_MAIL. It's visible in both raw and html format. If your mail agent doesn't show one of them, you can visualize both on Postmark --> Your server --> Transactional Stream --> Activity.