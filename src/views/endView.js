/**
 * Ending page of the exp
 *
 */

import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import fullscreen from '@jspsych/plugin-fullscreen';

import { jsPsych } from "../models/jsPsychModel.js"
import { get_condition } from "../models/conditionManager"
import { fullscreenListener } from "../utilities"


// display result in a format
function showResult(result) {
    var displayR = "";
    result.forEach((rr) => {
/*        console.log(rr);*/
        displayR += rr.stimulus + "<br>"
            + rr.acceptance + " " + rr.rspTime + "ms"
            + "<br><br>";
    })
    return displayR;
}

//exit fullscreen after the results are shown
var exit_fullscreen = {
    type: fullscreen,
    fullscreen_mode: false,
    delay_after: 0,
}

// show this page within T ms
var s4 = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: '<p class="p-descript">Thank you for the participation. Here are your choices.</p>',
    prompt: function () {
        var result = globalThis.myResultModel.getResult();
        return showResult(result);
    },
    trial_duration: 5000,
    on_finish:function (data) {
        data.myResult = globalThis.myResultModel.saveModel();//save statistics and user response
        //save experiment conditions
        data.myResult.push(get_condition());

        //exit fullscreen
        window.removeEventListener('resize', fullscreenListener);
        jsPsych.addNodeToEndOfTimeline(exit_fullscreen);

    },
};



export {
    s4
}