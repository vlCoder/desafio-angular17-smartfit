import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../../types/location.interface';
import { GetUnitsService } from '../../services/get-units.service';
import { FilterUnitsService } from '../../services/filter-units.service';

// Exemplo de uso de Reactive forms
@Component({
  selector: 'forms-bioritmo',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl:'./forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
  @Output() submitEvent = new EventEmitter();
  faClock = faClock;
  filteredResults: Location[] = [];
  results: Location[] = [];
  form!: FormGroup;
  //form Test Driving
  // userChoice: any = {
  //   hour: '',
  //   showClose: false
  // }

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService, 
    private filterUnitsService: FilterUnitsService
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hour: '',
      showClosed: true
    });
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data
      this.filteredResults = data;
    });
  }


  onSubmit() {
    let{showClosed, hour} = this.form.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitService.setFilterUnits(this.filteredResults)

    this.submitEvent.emit()
  }

  onClear() {
    this.form.reset({
      showClosed: false
    });
  }

}
