import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name?: string;
  age?: number;
  birthdate: Date = new Date(2022, 0, 1);
  formattedBirthdate: string = formatDate(
    this.birthdate,
    'MM/dd/yyyy',
    'en-US'
  );
  contactNumber?: string;
  selectedGender: string = 'male';
  selectedStatus: string = 'Single';
  nationality?: string;
  occupation?: string;
  selectedSchool: string = 'None';

  // ... other code ...

  generateExcelFile() {
    const data = [
      [
        'Name',
        'Age',
        'Birthdate',
        'Contact Number',
        'Sex',
        'Status',
        'Nationality',
        'Occupation',
        'Highest Education',
      ],
      [
        this.name,
        this.age,
        this.formattedBirthdate,
        this.contactNumber,
        this.selectedGender,
        this.selectedStatus,
        this.nationality,
        this.occupation,
        this.selectedSchool,
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      'form-data.xlsx'
    );
  }

  onBirthdateChange(event: any) {
    const date = new Date(event.detail.value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.birthdate = new Date(year, month - 1, day);
    this.formattedBirthdate = formatDate(this.birthdate, 'MM/dd/yyyy', 'en-US');
  }

  onGenderChange(gender: string) {
    this.selectedGender = gender;
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
  }

  onSchoolChange(school: string) {
    this.selectedSchool = school;
  }
}
