# Text-Editor
This is simple text editor created in JavaScript. It has following features:
* When user presses enter, a new paragraph is created with the new paragraph having the focus.
* User can drag and drop paragraphs to change their order. User can start the drag from the end or an empty region of the paragraph. While the user drags a paragraph, the regions where it could be dragged are highlighted and when drop on a valid region, the paragraph is moved there, if possible.
* When user selects a word or a sentence, a tooltip is shown. From the tooltip user can select one of the four options - bold, underline, change color to red and change color to black.
* User can add links using <a> tags. When the user clicks on Done, all the links are shown below the Done button. The links redirect to correct pages as specified in the <a> tag and to # if not specified.
* If before selecting Done user checks the option to replace all four letter words, all the four letter words will be replaced by words generated from the link given.
