```jsx harmony noeditor

const dateObjects = [
  {
   code: "dates.formatDate(date, format = 'M/D/YYYY')",
   examples: ["dates.formatDate(0)", "dates.formatDate(633936840, 'LLLL')"],
  },
  {
   code: "dates.formatLocalDateTime(date, dateFormat = 'M/D/YYYY', timeFormat = 'h:mm a', at = 'at')",
   examples: ["dates.formatLocalDateTime(633936840)", "dates.formatLocalDateTime(0)"],
  },
  {
   code: "dates.formatTableDate(date, format)",
   examples: ["dates.formatTableDate(633936840)", "dates.formatTableDate(0, 'YYYY-MM-DD')"],
  },
  {
   code: "dates.getAge(dateOfBirth)",
   examples: ["dates.getAge(633936840)", "dates.getAge(0)"],
  },
  
];

const DateExamples = () => (
  <div>
    {
      dateObjects.map((dateObj, index) => (
        <div key={index} style={{ border: '1px solid #f9f9f9', borderRadius: '3px', padding: '10px', marginBottom: '10px'  }}>
          <pre style={{ display: 'inline-block', padding: '10px', backgroundColor: '#f9f9f9' }}>{dateObj.code}</pre>   
          <table>
            <thead>
              <tr>
                <th>Function Call</th>
                <th style={{ backgroundColor: '#f9f9f9', padding: '10px' }}>Output</th> 
              </tr>
            </thead>
            <tbody>
              {
                dateObj.examples.map((exampleCode, index) => (
                  <tr key={index}>
                    <td>{exampleCode}</td>
                    <td style={{ backgroundColor: '#f9f9f9', padding: '10px' }}>{eval(exampleCode)}</td> 
                  </tr>  
                ))
              }
            </tbody>
          </table>
        </div>  
      ))
    }
  </div>
);

<DateExamples />
```
