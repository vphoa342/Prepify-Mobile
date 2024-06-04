import { RiveRef } from "rive-react-native";

const TeddyConfig = {
    stateMachineName: "Teddy State Machine",
    resourceName: "teddy_authentication",
    states: {
        isChecking: "isChecking",
        numberLook: "numberLook",
        isHandsUp: "isHandsUp",
        triggerSuccess: "triggerSuccess",
        triggerFail: "triggerFail",
    },
};
const teddyHandsUp = (rive: React.RefObject<RiveRef>, value: boolean) => {
    rive.current?.setInputState(
        TeddyConfig.stateMachineName,
        TeddyConfig.states.isHandsUp,
        value
    );
};

const teddyNumberLook = (rive: React.RefObject<RiveRef>) => {
    rive.current?.setInputState(
        TeddyConfig.stateMachineName,
        TeddyConfig.states.numberLook,
        true
    );
};

const teddyChecking = (rive: React.RefObject<RiveRef>, value: boolean) => {
    rive.current?.setInputState(
        TeddyConfig.stateMachineName,
        TeddyConfig.states.isChecking,
        value
    );
};

const teddySuccess = (rive: React.RefObject<RiveRef>) => {
    rive.current?.setInputState(
        TeddyConfig.stateMachineName,
        TeddyConfig.states.triggerSuccess,
        true
    );
};

const teddyFail = (rive: React.RefObject<RiveRef>) => {
    rive.current?.setInputState(
        TeddyConfig.stateMachineName,
        TeddyConfig.states.triggerFail,
        true
    );
};

export {
    TeddyConfig,
    teddyHandsUp,
    teddyNumberLook,
    teddyChecking,
    teddySuccess,
    teddyFail,
};
