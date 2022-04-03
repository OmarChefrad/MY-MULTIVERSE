interface Image {
  asset: {
    url: string
  }
}
export interface Creator {
  _id: string
  name: string
  bio: string
  address: string
  image: Image
  slug: {
    current: string
  }
}
export interface Collection {
  _id: string
  name: string
  bio: string
  address: string
  description: string
  NftCollectionName: string
  mainImage: Image
  previewImage: Image
  slug: {
    current: string
  }
}
