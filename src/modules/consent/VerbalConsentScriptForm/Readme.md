```jsx
  var asyncConsent = () => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          response: {
            status: 200
          }
        });
      }, 3000);
    });
  }

  var onComplete = () => {
    console.log('Navigating Away')
  }

  var declineConsent = () => {
    console.log('declining consent')
  }

  <VerbalConsentScriptForm
    acceptConsent={asyncConsent}
    declineConsent={declineConsent}
    onComplete={onComplete}
    title="Verbal Informed Consent for Participation and Information Sharing"
    fullName="Alex Lee"
  />
```
