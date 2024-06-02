// import io from "socket.io-client"

//     const SOCKET_URL= "http://10.0.2.2:4000";
       
    
//     class WSService{
//         initializeSocket=async()=>{
//             try {
//                    this.socket = io(SOCKET_URL,{
//                     transports:["webSocket"]
//                    })
//                    console.log("initializeSocket",this.socket)

//                    this.socket.on("connect",(data)=>{ console.log("connect")})

//                    this.socket.on("disconnect",(data)=>{ console.log("connect")})

//                    this.socket.on("error",(data)=>{ console.log("error", data)})
                  
//             } catch (error) {
//                 console.log("errorerror", error)
//             }
//         }

//         emit(event,data={}){
//             this.socket.emit(event,data)
//         }

//         on(event,cb){
//             this.socket.on(event,cb)
//         }

//         removeListener(listenerName){
//             this.socket.removeListener(listenerName)
//         }
//     }

//     const socketServices = new WSService()
//     export default socketServices