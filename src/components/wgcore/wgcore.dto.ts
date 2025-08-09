export type CreatePeerDTO = {
      id:string,
      peerName:string
      publicKey:string
      PresharedKey:string
      AllowedIps:string 
      shelflife:string
}

export type FilterDTO = {
  AllowedIps?:string,
  peerName?:string
}

export type UpdatePeerDTO = {
  id:string
  peerName?:string,
  banned?:boolean,
  shelflife?:string
}
