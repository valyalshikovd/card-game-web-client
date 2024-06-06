


const URL = "http://card-game-backend-spring-production.up.railway.app/api/v1/room"


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
        }
    )
    return res

}

export const createRoom = (roomName) => {

    console.log("создание комнаты")


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: roomName
    };

    return  fetch(URL, options)
}