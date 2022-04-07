import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PaymentService } from 'src/app/menu/reports/payments/payment.service';
import { ReceiptService } from 'src/app/menu/reports/receipts/receipt.service';
import { PaymentModalComponent } from 'src/app/shared/payment-modal/payment-modal.component';
import { Debtor } from '../../debtor.model';
import { DebtorService } from '../../debtor.service';

@Component({
  selector: 'app-information-child',
  templateUrl: './information-child.component.html',
  styleUrls: ['./information-child.component.scss'],
})
export class InformationChildComponent implements OnInit {

  filtered = [];
  filteredR = [];
  debtor: Debtor;
  debtorId: string;
  @Input() debtorInfo: Debtor;

  newBalance: number;
  invoiceTotal: number = 0;
  paymentTotal: number = 0;
  total: number = 0;
  isLoading = false;
  segment = 'information';
  title = 'Debtor Information';
  isMobile = false;
  debtorPage = true;
  modal: HTMLElement;
  private debtorSub: Subscription;
  private paymentSub: Subscription;
  private receiptSub: Subscription;

  constructor(
    private debtorService: DebtorService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private paymentService: PaymentService,
    private receiptService: ReceiptService,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.debtor = this.debtorInfo;

    if (window.screen.width < 576) {
      this.isMobile = true;
    }
    console.log('new');
    // console.log(this.debtorInfo);
    // this.debtor = this.debtorInfo
    // this.route.paramMap.subscribe((paramMap) => {
    //   if (!paramMap.has('debtorId')) {
    //     this.navCtrl.navigateBack('/menu/tabs/debtors');
    //     return;
    //   }
    //   this.debtorId = paramMap.get('debtorId');
    //   this.isLoading = true;
    //   this.debtorSub = this.debtorService
    //     .getDebtor(paramMap.get('debtorId'))
    //     .subscribe((debtor) => {
    //       this.debtor = debtor;
    //       this.isLoading = false;
    //     });
    // });
      this.paymentSub = this.paymentService.fetchPayments(this.debtorId).subscribe(payment => {
      this.isLoading = false;
      console.log(payment);

      this.getInvoiceTotal(payment);

      console.log('Payment Total' + this.paymentTotal)


      // console.log(payment.reduce((acc, val) => this.newTotal = acc += val.amount, 0));
      // this.debtor.totalBalance = this.debtor.totalBalance - this.newTotal;
    });
  }

  // ionViewWillEnter(){
  //   this.isLoading = true;
  //   this.paymentSub = this.paymentService.fetchPayments(this.debtorId).subscribe(payment => {
  //     this.isLoading = false;
  //     console.log(payment);

  //     this.getInvoiceTotal(payment);

  //     console.log('Payment Total' + this.paymentTotal)


  //     // console.log(payment.reduce((acc, val) => this.newTotal = acc += val.amount, 0));
  //     // this.debtor.totalBalance = this.debtor.totalBalance - this.newTotal;
  //   });
  //   this.receiptService.fetchReceipts(this.debtorId).subscribe(receipt => {
  //     this.isLoading = false;
  // });
  // }

  getInvoiceTotal(payment){
    this.debtor.totalBalance = 0;
    this.invoiceTotal = 0;
    this.paymentTotal =0;
    payment.forEach(res => {
      console.log(res.amount);
      this.paymentTotal += res.amount;

      console.log(this.invoiceTotal + 'invoicetotal')
    });
    if(this.debtor.casketCoverPrice === undefined){
      this.debtor.casketCoverPrice = 0;
    } if(this.debtor.churchOfferringPrice === undefined){
      this.debtor.churchOfferringPrice = 0;
    } if(this.debtor.clothsPrice === undefined){
      this.debtor.clothsPrice = 0;
    }if(this.debtor.coffinPrice === undefined){
      this.debtor.coffinPrice = 0;
    } if(this.debtor.coronerDoctorCertPrice === undefined){
      this.debtor.coronerDoctorCertPrice = 0;
    } if(this.debtor.cremationPrice === undefined){
      this.debtor.cremationPrice = 0;
    }if(this.debtor.flowersPrice === undefined){
      this.debtor.flowersPrice = 0;
    } if(this.debtor.graveMarkerPrice === undefined){
      this.debtor.graveMarkerPrice = 0;
    } if(this.debtor.graveMatsTimbersPrice === undefined){
      this.debtor.graveMatsTimbersPrice = 0;
    }if(this.debtor.graveOpenPrice === undefined){
      this.debtor.graveOpenPrice = 0;
    } if(this.debtor.gravePurchasePrice === undefined){
      this.debtor.gravePurchasePrice = 0;
    } if(this.debtor.hairdresserPrice === undefined){
      this.debtor.hairdresserPrice = 0;
    }
    if(this.debtor.organistPrice === undefined){
      this.debtor.organistPrice = 0;
    } if(this.debtor.otherDetailsPrice === undefined){
      this.debtor.otherDetailsPrice = 0;
    }if(this.debtor.paperNoticePrice === undefined){
      this.debtor.paperNoticePrice = 0;
    } if(this.debtor.radioNoticePrice === undefined){
      this.debtor.radioNoticePrice = 0;
    } if(this.debtor.sacristianPrice === undefined){
      this.debtor.sacristianPrice = 0;
    }if(this.debtor.servicesPrice === undefined){
      this.debtor.servicesPrice = 0;
    } if(this.debtor.soloistPrice === undefined){
      this.debtor.soloistPrice = 0;
    } if(this.debtor.urnPrice === undefined){
      this.debtor.urnPrice = 0;
    }
    console.log(this.debtor);
          console.log('Console hyup');

    this.invoiceTotal =
    this.debtor.casketCoverPrice +
    this.debtor.churchOfferringPrice +
    this.debtor.clothsPrice +
    this.debtor.coffinPrice +
    this.debtor.coronerDoctorCertPrice +
    this.debtor.cremationPrice +
    this.debtor.flowersPrice +
    this.debtor.graveMarkerPrice +
    this.debtor.graveMatsTimbersPrice +
    this.debtor.graveOpenPrice +
    this.debtor.gravePurchasePrice +
    this.debtor.hairdresserPrice +
    this.debtor.organistPrice +
    this.debtor.otherDetailsPrice +
    this.debtor.paperNoticePrice +
    this.debtor.radioNoticePrice +
    this.debtor.sacristianPrice +
    this.debtor.servicesPrice +
    this.debtor.soloistPrice +
    this.debtor.urnPrice;

    this.debtor.totalBalance = this.invoiceTotal - this.paymentTotal;
    console.log('Invoice Total' + this.invoiceTotal);
  }

  async presentModal(){
    await this.modalCtrl.create({
      component: PaymentModalComponent,
      cssClass: 'new-donation',
      componentProps:{
        // eslint-disable-next-line quote-props
        'totalBalance': this.debtor.totalBalance
      }
    }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        // this.paymentService.addPayments(modalData.data.paymentData, this.debtorId, this.debtor.deceasedName)
        // .subscribe((payments) => {
        //   // this.payments = payments;
        // });
        // this.newBalance = this.debtor.totalBalance - modalData.data.paymentData.amount;
        // this.debtorService.updateDebtor(
        //   this.debtorId,
        //   modalData.data.paymentData
        // ).subscribe(debtor => {
        //   this.debtor = debtor;
        //   // this.paymentService.fetchPayments(this.debtor.id).subscribe();
        // });
      });
      modalEl.present();
      this.router.navigate([`/menu/tabs/debtors/view/${this.debtorId}`]);
    });

  }



  // ngOnDestroy() {
  //   this.debtorSub.unsubscribe();
  //   this.paymentSub.unsubscribe();
  // }
}
