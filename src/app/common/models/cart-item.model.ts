export interface CartItem {
  name:string,
  category:string,
  price:number,
  qtyInStck:number,
  imgSrc: string,
  prodId:number,
  disPrice?:number,
  added?:boolean,
  addedQty?:number
}