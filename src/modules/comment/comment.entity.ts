import typegoose, { getModelForClass, Ref, defaultClasses } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { COLLECTION_NAME } from '../../common/const.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME.COMMENT,
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text!: string;

  @prop({required: true})
  public rating!: number;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  public avg?: number;
}

export const CommentModel = getModelForClass(CommentEntity);
