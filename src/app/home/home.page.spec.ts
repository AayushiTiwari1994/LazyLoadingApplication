import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.url).toBe('assets/inputFiles/input.json');
  });

  it("should have a check getData function", inject(
    [HttpTestingController],
    (httpMock) => {
      const mockResponse = {
        items: [{}]
      };

      component.getData();
      const mockReq = httpMock.expectOne("assets/inputFiles/input.json");
      mockReq.flush(mockResponse);
      expect(component.items).toBeTruthy();
    }
  ));
  it("should check doInfinite function", inject(
    [HttpTestingController],
    (httpMock) => {
      const mockResponse = {
        items: [{}]
      };
      let event = {};
      component.doInfinite(event);
      const mockReq = httpMock.expectOne("assets/inputFiles/input.json");
      mockReq.flush(mockResponse);
      expect(component.items).toBeTruthy();
    }
  ));
  it("shouldcheck doRefresh", inject([HttpTestingController],
    (httpMock) => {
      const mockResponse = {
        items: [{}]
      };
      let event = {};
      component.doRefresh(event);
      expect(component.items).toBeTruthy();
    }
  ));
});
