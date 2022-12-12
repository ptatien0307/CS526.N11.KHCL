import { Alert } from 'react-native';


export const alertDeleteDialog = (title, message) => {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            message,
            [
                { text: 'YES', onPress: () => resolve(true) },
                { text: 'NO', onPress: () => resolve(false) }
            ],
            { cancelable: false }
        )
    })
}

export const alertEmptyDialog = () => {
    Alert.alert(
        "Lỗi",
        "Thông tin chỉnh sửa bị bỏ trống.",
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    )
}

