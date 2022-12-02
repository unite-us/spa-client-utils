```jsx
const formData = {
    "id":"8d65ae12-334a-47a7-aa73-09db87321c39",
    "name":"Tom's form",
    "is_active":false,
    "notes_text":"Test form for new service types",
    "sections":[
      {
        "id":"1df92473-94b7-48d2-ab55-b87b24c95362",
        "name":"This is section 2",
        "display_name":true,
        "display_order":20000,
        "section_type":"form_group",
        "questions":[
          {  
            "id":"d02f07bc-2ce1-4e2c-af47-f2d6796e2f4a",
            "label_text":"How long?",
            "display_order":40000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":true,
            "help_text":"like years?",
            "help_text_position":"after_input",
            "input_type":"duration",
            "response_type":"string",
            "validators":[  
              {  
                "id":"3a09d350-14f2-405b-bf71-81698c5bc048",
                "validation_type":"presence",
                "message":"is required",
              }
            ],
            "base_question_id":"8ddd2363-7f2e-4731-91a8-ca254a5f01b8",
            "conditional_display":null,
            "response": {
              response_value: {
                start: '8640000',
                end: '18940000',
              }
              },
            "css_classes":[  

            ],
            "usage_contexts":[  

            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[  

            ],
          },
          {
            id:"55f02e00-f15d-471d-a590-042c130c1ae2",
            input_type: "block",
            label_text: "Thank you!  You have completed the survey",
            conditional_display: null,
            display_order: 5000,
          },
          {
            "id":"4cd787bb-fbbe-4b61-82b4-c63d3f9588b0",
            "label_text":"Date of birth",
            "display_order":30000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":true,
            "help_text":"are you born already?",
            "help_text_position":"after_input",
            "input_type":"date",
            "response_type":"string",
            "validators":[  
              {  
                "id":"3a09d350-14f2-405b-bf71-81698c5bc048",
                "validation_type":"presence",
                "message":"is required",
              }
            ],
            "base_question_id":"3c074577-ce7f-45da-8a3f-169797aa67a7",
            "conditional_display":null,
            "response": {
              response_value: 864000,
              },
            "css_classes":[  

            ],
            "usage_contexts":[  

            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[  

            ],
          },
          {
            "id":"fd4122ed-d5b1-4d0d-888d-a03c2d88714a",
            "label_text":"How many?",
            "display_order":20000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":false,
            "help_text":null,
            "help_text_position":null,
            "input_type":"number",
            "response_type":"string",
            "validators":[
              {
                "id":"c1f1e67b-18fd-4035-a1ce-67410eb56258",
                "validation_type":"numericality",
                "message":"must be numeric and less than 100",
                "only_integer":true,
                "less_than":100.0,
                // "equal_to": 7,
                // "not_equal_to": 10,
                // "greater_than": 3,
              }
            ],
            "base_question_id":"965ceb2c-3bde-49b4-8351-f8e9a6bb7d72",
            "conditional_display":null,
            "response": {
              response_value: 11,
              },
            "css_classes":[

            ],
            "usage_contexts":[

            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[

            ],
          },
          {
            "id":"901e5906-c5c2-4578-9de8-96d831610c62",
            "label_text":"What about?",
            "display_order":10000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":false,
            "help_text":null,
            "help_text_position":null,
            "input_type":"radio",
            "response_type":"string",
            "validators":[
              {
                "id":"6c87c196-0aa7-4075-9409-f9c652e947a9",
                "validation_type":"presence",
                "message":"is required",
              }
            ],
            "base_question_id":"7f7bdcf8-874d-4ab0-a087-9626e4954d22",
            "conditional_display":{
              "show_or_hide":"show",
              "and_conditions":[
                {
                  "operator":"is_not_blank",
                  "operator_value":"bla",
                  "question_id":"efdb3bcb-61d1-4b9f-8e70-7aabd08c6754",
                }
              ],
              "or_conditions":[

              ],
            },
            "response": {
              response_value: "e45dc347-fd93-4d68-afe4-ab33327aafea",
              },
            "css_classes":[

            ],
            "usage_contexts":[

            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[
              {
                "id":"2f30a39c-4d66-442b-9e01-a9e92581607d",
                "option_label":"Yes",
                "display_order":0,
                "base_input_option_id":"f2e77d76-70dc-4529-99cb-6814b6e13eae",
              },
              {
                "id":"b3669d41-e02b-4e9a-9d96-b3515e65e1b6",
                "option_label":"No",
                "display_order":1,
                "base_input_option_id":"99e9d717-a3f2-432d-a2ec-7d6b3ccc4f06",
              },
              {
                "id":"e45dc347-fd93-4d68-afe4-ab33327aafea",
                "option_label":"Maybe",
                "display_order":2,
                "base_input_option_id":"3e02a79a-56dd-4c2f-9997-cc5208e78ffd",
              }
            ],
          },
          {
            "id":"efdb3bcb-61d1-4b9f-8e70-7aabd08c6754",
            "label_text":"Tell me more",
            "display_order":0,
            "placeholder_text":"",
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":true,
            "help_text":"What's up?",
            "help_text_position":"after_input",
            "input_type":"textarea",
            "response_type":"string",
            "validators":[
              {
                "id":"6d2a1563-b331-49c0-98c0-215e51d8a086",
                "validation_type":"presence",
                "message":"is required",
              }
            ],
            "base_question_id":"a241721a-464e-4e16-86fa-f01e0d8f4921",
            "conditional_display":null,
            "response": {
              response_value: "bla bla bla"
              },
            "css_classes":[

            ],
            "usage_contexts":[

            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[

            ],
          }
        ],
      },
      {
        "id":"c5961210-f667-4c50-b460-442ebca81c57",
        "name":"Form section 1",
        "display_name":true,
        "display_order":10000,
        "section_type":"form_group",
        "questions":[
          {
            "id":"23050549-a02e-4449-9069-8b4796f1fb53",
            "label_text":"Pick some",
            "display_order":20000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":false,
            "help_text":null,
            "help_text_position":null,
            "input_type":"checkbox",
            "response_type":"array",
            "validators":[

            ],
            "base_question_id":"4e54603e-badb-485b-add8-806ef5141c2c",
            "conditional_display":null,
            "response": {
              response_value: [
                "8c707204-8bea-4f86-aeac-5a1c5090f1b6",
                "da8341ed-c01b-4bcd-b441-6b78c7f70906",
              ]
              },
            "css_classes":[

            ],
            "usage_contexts":[
              {
                "id":"1d5a06e8-91d9-429a-881c-14bfc9015f47",
                "usage_context_type":"intake",
              }
            ],
            "min_selections":2,
            "max_selections":0,
            "input_options":[
              {
                "id":"8c707204-8bea-4f86-aeac-5a1c5090f1b6",
                "option_label":"Option 1",
                "display_order":0,
                "base_input_option_id":"125fc702-1156-4b1f-92bb-9ecbeb3ce038",
              },
              {
                "id":"4daefe1f-ddc2-4fbe-8929-2af76ce1246b",
                "option_label":"Option 2",
                "display_order":1,
                "base_input_option_id":"6322f43d-f458-49ae-9098-059588235551",
              },
              {
                "id":"da8341ed-c01b-4bcd-b441-6b78c7f70906",
                "option_label":"Option 3",
                "display_order":2,
                "base_input_option_id":"b832c5f0-3469-4c67-93a3-845c5bf99786",
              },
              {
                "id":"9fd1edf6-dbc1-4cf5-80fa-ec15ca634eb9",
                "option_label":"Option 4",
                "display_order":3,
                "base_input_option_id":"f3324958-72e5-4d8f-8b11-805902118aed",
              }
            ],
          },
          {
            "id":"fd284390-c24d-4022-8ae4-ee68a976df8f",
            "label_text":"Do you?",
            "display_order":10000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":true,
            "help_text":"really",
            "help_text_position":"after_input",
            "input_type":"select",
            "response_type":"array",
            "validators":[
              {
                "id":"f595d704-61f9-4c57-841d-51d6e2b970e6",
                "validation_type":"presence",
                "message":"is required",
              }
            ],
            "base_question_id":"5e3dcbec-1e29-4bb3-856d-a0010ae1e1da",
            "conditional_display":null,
            "response": {
              response_value: ["19a174c9-9ad1-452b-b828-47531f6b69e9"],
            },
            "css_classes":[

            ],
            "usage_contexts":[
              {
                "id":"1d5a06e8-91d9-429a-881c-14bfc9015f47",
                "usage_context_type":"intake",
              }
            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[
              {
                "id":"19a174c9-9ad1-452b-b828-47531f6b69e9",
                "option_label":"Yes",
                "display_order":0,
                "base_input_option_id":"fe12d5dc-27af-4841-9e38-3fecdd1de61c",
              },
              {
                "id":"96c9d469-57f1-452d-896e-f9500a052977",
                "option_label":"No",
                "display_order":1,
                "base_input_option_id":"36f4f8a9-7e1c-40e2-9411-bd6703cb8577",
              }
            ],
          },
          {
            "id":"d340ec54-e166-4ae3-a671-fdd440dcd9cf",
            "label_text":"Favorite color?",
            "display_order":20000,
            "placeholder_text":null,
            "is_sensitive":false,
            "is_required":false,
            "show_help_text":false,
            "help_text":null,
            "help_text_position":null,
            "input_type":"text",
            "response_type":"string",
            "validators":[
              {
                "id":"93a111c8-b9bc-401a-bcd9-6616a93bb42d",
                "validation_type":"presence",
                "message":"is required",
              }
            ],
            "base_question_id":"097141b4-bfcc-46ba-8d96-b867760db287",
            "conditional_display":{
              "show_or_hide":"show",
              "and_conditions":[

              ],
              "or_conditions":[
                {
                  "operator":"is",
                  "operator_value":"Yes",
                  "question_id":"fd284390-c24d-4022-8ae4-ee68a976df8f",
                },
                {
                  "operator":"contains",
                  "operator_value":"Option 1, Option 2",
                  "question_id":"23050549-a02e-4449-9069-8b4796f1fb53",
                }
              ],
            },
            "response":null,
            "css_classes":[

            ],
            "usage_contexts":[
              {
                "id":"1d5a06e8-91d9-429a-881c-14bfc9015f47",
                "usage_context_type":"intake",
              }
            ],
            "min_selections":0,
            "max_selections":0,
            "input_options":[

            ],
          }
        ],
      }
    ],
};

let form = null;
let promise = null;

function submit() {
  promise = form.wrappedInstance.submit();
  promise
    .then(data => console.log('resolving with', data))
    .catch(errors => console.log('submit failed', errors));
}

<div>
  <FormRenderer
    ref={(c) => form = c}
    formData={formData}
    onSubmit={data => console.log('onSubmit in the parent', data)}
  />
  <Button
    label="Submit"
    onClick={submit}
    primary
  />
  <Button
    label="Reset"
    onClick={() => form.wrappedInstance.reset()}
  />
</div>
```
