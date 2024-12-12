# Curator AI - Newsletter Mail Agent

Mailing part of the Newsletter. Uses the curate agent to generate the content and formats the data to send it in an email. 

## Send a sample email

First, define the POSTMARK_SERVER_API_KEY and POSTMARK_DEFAULT_MAIL in .env located in curator workspace root :

```txt
POSTMARK_SERVER_API_KEY=XXX
POSTMARK_DEFAULT_MAIL=XXX
```

Make sure you have dependencies installed :
```sh
make install
```

Send a sample email from the root of the project :
```sh
make send_mail
```

The mail will be sent to the mail you defined in POSTMARK_DEFAULT_MAIL. It's visible in both raw and html format. If your mail agent doesn't show one of them, you can visualize both on Postmark --> Your server --> Transactional Stream --> Activity.