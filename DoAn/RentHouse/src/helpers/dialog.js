import { Alert } from 'react-native';


export const alertDeleteDialog = (title, message) => {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            message,
            [
                { text: 'Xóa', onPress: () => resolve(true) },
                { text: 'Quay lại', onPress: () => resolve(false) }
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
            { text: "OK", onPress: () => console.log("OK is Pressed") }
        ]
    )
}

export const alertMissingDialog = () => {
    Alert.alert(
        "Lỗi",
        "Một số thông tin bị bỏ trống.",
        [
            { text: "OK", onPress: () => console.log("OK is Pressed") }
        ]
    )
}

export const editSuccessDialog = () => {
    Alert.alert(
        "Thành công",
        "Chỉnh sửa thành công.",
        [
            { text: "Quay lại", onPress: () => { } }
        ]
    )
}

export const successDialog = (message) => {
    Alert.alert(
        'Thành công',
        message,
        [
            { text: "Quay lại", onPress: () => { } }
        ]
    )
}


export const errorDialog = (message) => {
    Alert.alert(
        'Lỗi',
        message,
        [
            { text: "Quay lại", onPress: () => { } }
        ]
    )
}


export const deleteSuccessDialog = () => {
    Alert.alert(
        "Thành công",
        "Xóa thành công.",
        [
            { text: "Quay lại", onPress: () => { } }
        ]
    )
}