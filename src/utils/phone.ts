import * as Linking from "expo-linking";

const makePhoneCall = (phoneNumber: string): void => {
    const phoneUrl = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneUrl)
        .then((supported) => {
            if (!supported) {
                throw new Error("Phone number is not available");
            } else {
                return Linking.openURL(phoneUrl);
            }
        })
        .catch((err) => console.log(err));
};

export default makePhoneCall;
