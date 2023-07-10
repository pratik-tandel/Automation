from twilio.rest import Client 
 
account_sid = 'account_sid' 
auth_token = 'auth_token' 
client = Client(account_sid, auth_token) 
 
message = client.messages.create( 
                              from_='whatsapp:+14155238886',  
                              body='Your Twilio code is 1238432',      
                              to='whatsapp:+4915128288055' 
                          ) 
 
print(message.sid)