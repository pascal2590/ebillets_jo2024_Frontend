export interface Offre {
    idOffre: number;
    nomOffre: string;
    prix: number;
}

export interface PanierOffre {
    idOffre: number;
    quantite: number;
    offre: Offre;
}

export interface PanierDto {
    idPanier: number;
    idUtilisateur: number;
    dateCreation: string;
    paniersOffres: PanierOffre[];
}
