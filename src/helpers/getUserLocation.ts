


export const getUserLocation = async (): Promise<[number, number]> => {

    return new Promise(( resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            resolve([coords.longitude, coords.latitude])
        }, 
        (err) => {
            alert("No cuentas con servicio de geolocalización")
            console.log(err)
            reject()
        }
    
        )
    })

}