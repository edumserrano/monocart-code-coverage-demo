import { ComponentFixtureAutoDetect, TestBed } from "@angular/core/testing";
import { AppModule } from "src/app/app.module";

// FIXME delete these comments when we implement tests
// let _fixture: ComponentFixture<FindInstitutionComponent>;

beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        imports: [AppModule],
    });

    // _fixture = TestBed.createComponent(FindInstitutionComponent);
});

test.todo("implement tests");
