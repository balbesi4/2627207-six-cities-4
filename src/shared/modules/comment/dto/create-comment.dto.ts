export class CreateCommentDto {
  public text!: string;
  public rating!: number;
  public publicationDate!: Date;
  public offerId!: string;
  public userId!: string;
}
