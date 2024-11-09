```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes a note into the text field and clicks the save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser executes the callback function that renders the new note
```