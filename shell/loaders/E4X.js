// this does not load a library, but changes the E4X defaults to
// the what they are with ;e4x=1 appended to the script type
if (this.XML) {
    XML.ignoreComments = false;
    XML.ignoreProcessingInstructions = false;
    if (typeof XML.preserveCDATA != "undefined") // https://bugzilla.mozilla.org/show_bug.cgi?id=389123
        XML.preserveCDATA = true;
}
