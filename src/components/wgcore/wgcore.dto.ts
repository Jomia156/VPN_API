import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsDate
} from 'class-validator';

export class PeerDTO {
    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsNotEmpty()
    peerName: string

    @IsString()
    @IsNotEmpty()
    PrivateKey: string

    @IsString()
    @IsNotEmpty()
    PublicKey: string

    @IsString()
    @IsNotEmpty()
    PresharedKey: string

    @IsString()
    @IsNotEmpty()
    AllowedIPs: string

    @IsDate()
    @IsOptional()
    created_date?: Date

    @IsDate()
    @IsNotEmpty()
    shelflife: Date

    @IsBoolean()
    @IsOptional()
    banned?: boolean
}

export class CreatePeerDTO {

    @IsString()
    @IsNotEmpty()
    peerName: string

    @IsDate()
    @IsNotEmpty()
    shelflife: Date 
}

export class FilterDTO {
    
    @IsNumber()
    @IsOptional()
    id?:number
    
    @IsString()
    @IsOptional()
    AllowedIps?: string

    @IsString()
    @IsOptional()
    peerName?: string

    @IsBoolean()
    @IsOptional()
    banned?: boolean
}

export class UpdatePeerDTO {
    
    @IsNumber()
    @IsOptional()
    id?: number
    
    @IsString()
    @IsOptional()
    peerName?:string
    
    @IsBoolean()
    @IsOptional()
    banned?:boolean
    
    @IsDate()
    @IsOptional()
    shelflife?:Date
}

export class PeerID {
    
    @IsNumber()
    @IsNotEmpty()
    id:number
}
