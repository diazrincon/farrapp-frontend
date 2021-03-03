import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faLocationArrow, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import {faIdCard} from '@fortawesome/free-solid-svg-icons';
import {faLock, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/';
import {faBuilding} from '@fortawesome/free-regular-svg-icons/faBuilding';
import {faAt} from '@fortawesome/free-solid-svg-icons/faAt';
import {faSlideshare} from '@fortawesome/free-brands-svg-icons';
import {CompanyRegistration} from '../../model/company';
import {CompanyService} from '../../services/company.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  faLock = faLock;
  faUser = faUser;
  faIdCard = faIdCard;
  faExclamationTriangle = faExclamationTriangle;
  faBuilding = faBuilding;
  faLocationArrow = faLocationArrow;
  faAt = faAt;
  faPhone = faPhone;
  faSlideshare = faSlideshare;

  company: CompanyRegistration;

  email: string;
  password: string;
  passwordCon: string;
  name: string;
  address: string;
  contactNumber: string;
  nit: string;
  errorMessage: string;

  constructor(private router: Router, private companyService: CompanyService, private notificationService: NotificationService) {

  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.company = {
      e_mail: this.email,
      password: this.password,
      name: this.name,
      address: this.address,
      contact_number: this.contactNumber,
      nit: this.nit
    };
    this.companyService.register(this.company).subscribe((res) => {
        this.router.navigate(['login']);
        this.notificationService.succesCreateCompany();
      },
      error => {
        this.errorMessage = error.error.message;
        if (this.isExistEmail()) {
          this.notificationService.emailExist();
        } else if (this.isExistName()) {
          this.notificationService.nameExist();
        } else if (this.isExistNit()) {
          this.notificationService.nitExist();
        }
      }
    );
  }

  redirect(): void {
    this.router.navigate(['']);
  }


  isEqual(): boolean {
    return this.password === this.passwordCon;
  }

  isDifferentTo(): boolean {
    return this.password === 'Passw0rd' || this.password === 'Password123';
  }

  isExistEmail(): boolean {
    return this.errorMessage === 'El correo electronico ingresado ya existe';
  }

  isExistNit(): boolean {
    return this.errorMessage === 'Ya existe una empresa registrada con ese identificador de NIT';
  }

  isExistName(): boolean {
    return this.errorMessage === 'Ya existe una empresa registrada con ese nombre';
  }

  isInvalid(): boolean {
    return !this.isEqual();
  }

  isValidPassLenght(): boolean {
    return this.password?.length < 8;
  }


  isEmpty(): boolean {
    return this.password?.length === 0;
  }


  contentSpaces(): boolean {
    if (/\s/.test(this.password?.toString())){
      return true;
    } else {
      return  false;
    }
  }

  contentUpper(): boolean {
    if (/[A-Z]/.test(this.password?.toString())){
      return false;
    } else {
      return  true;
    }
  }

  contentLower(): boolean {
    if (/[a-z]/.test(this.password?.toString())){
      return false;
    } else {
      return  true;
    }
  }

  contentDigits(): boolean {
    if (/^(?:\D*\d){2,100}\D*$/.test(this.password?.toString())){
      return false;
    } else {
      return  true;
    }
  }


  isMaxLength(): boolean {
    console.log("CONTACT: " + this.contactNumber?.length);
    return this.contactNumber?.length < 10;
  }

}
