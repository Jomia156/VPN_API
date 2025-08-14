export type CreatePeerDTO = {
      peerName:string
      PrivateKey:string,
      PublicKey:string
      PresharedKey:string
      AllowedIPs:string 
      shelflife:string
}

export type FilterDTO = {
  AllowedIps?:string,
  peerName?:string
  banned?:boolean
}

export type UpdatePeerDTO = {
  id:number,
  peerName?:string,
  banned?:boolean,
  shelflife?:string
}

export type PeerDTO = {
  id:number,
  peerName:string,
  PrivateKey:string,
  PublicKey:string,
  PresharedKey:string,
  AllowedIPs:string,
  created_date:string,
  shelflife:string,
  banned:boolean 
}
