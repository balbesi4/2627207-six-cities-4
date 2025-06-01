import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { City, Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferService } from './offer-service.interface.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getOffers,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getSingleOffer,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateOffer,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
    });
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremiumOffers,
    });
  }

  public async getOffers(_req: Request, res: Response): Promise<void> {
    const allOffers = await this.offerService.find();
    this.ok(res, allOffers);
  }

  public createOffer(_req: Request, _res: Response): void {
  }

  public async getSingleOffer(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, offer);
  }

  public updateOffer(_req: Request, _res: Response): void {
  }

  public async deleteOffer(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    await this.offerService.deleteById(offerId);
    this.noContent(res, {});
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const city = req.params.city;
    const cityType = this.parseCityType(city);

    if (!cityType) {
      throw new Error('Invalid cityType');
    }

    const offers = await this.offerService.findPremiumOffersByCity(cityType);
    this.ok(res, offers);
  }

  private parseCityType(city: string): City | null {
    if (city in City) {
      return city as City;
    }
    return null;
  }
}
