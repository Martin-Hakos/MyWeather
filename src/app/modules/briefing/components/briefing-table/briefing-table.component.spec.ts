import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingTableComponent } from './briefing-table.component';

describe('BriefingTableComponent', () => {
  let component: BriefingTableComponent;
  let fixture: ComponentFixture<BriefingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriefingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
