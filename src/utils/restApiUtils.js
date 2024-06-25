


const URL = "http://localhost:8080/api/v1/room"


export const getRooms = async () => {

    console.log("Комнаты ищутся")
    let res;
    await fetch(URL+ "/getAll").then(
        async (response) => {
            res = await response.json()
            console.log(res)

        }
    ).catch(
        (error) => {
            res = error
            alert("не удалось выполнить запрос")
        }
    )
    return res

}

export const createRoom = async (roomName) => {


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: roomName
    };

    let result
    await fetch(URL, options).then(
        async (response) => {
            result = await response.json()
        }
    )


    return result
}
