# Report for Assignment 1

## Project chosen

Name: PixiJS

URL: https://github.com/pixijs/pixijs

Number of lines of code and the tool used to count it: 45565 (65852 incl. tests), [lizard](https://github.com/terryyin/lizard)

Programming language: TypeScript  

## Coverage measurement

### Existing tool

We used the [jest coverage tool](https://jestjs.io/) which the original repository already employed. To set up the coverage tool we added the line: "test:coverage": "jest --coverage", in the package.json file of the script section. Once we have done that, the command: npm run test:coverage will return us the coverage report once it has fully run through all the necessary tests.

The initial results of the test coverage can be [found here](https://drive.google.com/file/d/1RcKVXa2hEKIxCyP6-7GUb2DBJy7wAxGy/view?usp=drive_link) in the form of an .html file.

### Your own coverage tool

**Andras Bencsik**  
[Commit1](https://github.com/pixijs/pixijs/commit/381d45e5d1d0291945fe0982ad3be85432eb5e99#diff-5c6b5a2eb6a2a64dafe9209f32bb1eb5827009e9e9f9d65585586af2baf700f0)  
[Commit2](https://github.com/pixijs/pixijs/commit/381d45e5d1d0291945fe0982ad3be85432eb5e99#diff-5c6b5a2eb6a2a64dafe9209f32bb1eb5827009e9e9f9d65585586af2baf700f0)  
![Screenshot 2024-06-27 192253](https://github.com/andrasBencsik/pixijs/assets/122271111/547752ed-f8a0-4326-973b-583c3d2e6828)  

**Balint Halacsy**  
[Commit](https://github.com/pixijs/pixijs/commit/c860c92656ecb31d8cdac2c71911054137909615)  
![Screenshot 2024-06-27 192507](https://github.com/andrasBencsik/pixijs/assets/122271111/f1056ddb-6474-4311-93bd-b74c0059c2dc)  

**Tonko Klein Gunnewiek**  
[Commit](https://github.com/andrasBencsik/pixijs/commit/0fdeef7d97da069b905f3a3a8e3fe0daf01d284d)  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/60dfe86b-58f7-4a43-9da0-3c5c5effc86a)  

**Shruthikrishna Shaji**  
[Commit](https://github.com/pixijs/pixijs/commit/8e9b21a9bbd51cd66e658eda9527997e26e05463)  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/ffd30021-8e52-453d-9e0b-ddb5f8ef1191)  

## Coverage improvement

### Individual tests

**Andras Bencsik**  
[Commit](https://github.com/andrasBencsik/pixijs/commit/45ede05420288a703f762b8d5679cc941930e19d)  
_Container.tests.ts_  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/88a4ddbd-ecd2-4a5b-9614-e5b7c51e796d)  
>The added tests in the Container.tests.ts file aim to improve the overall (89.8% => 97.45%) and branch (76.47% => 88.23%) coverage of the Container.ts file, which is in our opinion an acceptable amount of improvement seeing as this file was on the larger end.  
>One thing to point out is that both this and the next test (RoundedRectangle.tests.ts) target entire files/functionalities instead of just functions. This is largely because the functions that fall under optimal conditions (branch coverage <80%, more than 15-20 lines, doesn’t require changing of code in order to be fully testable) are few and far in-between.  

_RoundedRectangle.tests.ts_  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/499d2d1b-a49b-432c-b30a-37c8ad4af1f2)  
>The added tests improve the overall (50.79% => 95.23%) and branch (35.84% => 86.79%) coverage of the RoundedRectangle.ts file, a medium-sized file.

**Balint Halacsy**  
[Commit](https://github.com/pixijs/pixijs/commit/e5961980372f99a913f7c53c3ae45d5b4f664953)  
_Triangle.test.ts_  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/0e5a584b-2842-4969-ae48-b1f4d6fa87e9)  
>Here we made sure that new triangle objects have the expected values and functionalities with a 97% increase on coverage which is most definitely an improvement.

_defaultValues.test.ts_  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/3e0149c6-2836-4d44-b7d7-9f257e125854)  
>A much more trivial easy test coverage to write but just as important as if there tests are not passed then a lot more will also fail. Increasing the coverage to 100% we think it’s safe to say we have coverage over this file.

**Tonko Klein Gunnewiek**  
_CheckCircleIntegrity.test.ts_  [
Commit](https://github.com/pixijs/pixijs/compare/dev...andrasBencsik:pixijs:dev-Tonko)  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/c078d172-a729-42be-b2fe-7399bd415df5)  
>Using this test the percentage of code lines ran during the test for the circle component is improved by around 22%.  
>Now also all the functionality and branching of the circle component is being tested improving the branch coverage to a 100%.  
>This improved the coverage by fully testing the circle component, one that is easily overlooked but crucial for a number of files.
  
_getRenderableBounds.test.ts_
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/344cae54-62c0-4c26-b383-37c3003166c6)  
>The created test fully covers the use case of the set Renderable Bounds function. From a slight 8% coverage to a full 100%.
>This new test case checks the integrity of this function, giving it new coverage and improving the overall coverage.  

**Shruthikrishna Shaji**
[Commit](https://github.com/andrasBencsik/pixijs/commit/6696e48a29f55ed3bccd7a48dadaba26ce43587d)  
_ObservablePoint.tests.ts_  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/ef1bfa64-cb96-476e-966f-f375929790f8)
>The coverage of the statements has improved by 18.52% (from 81.48% to 100%). The branch coverage improved by 22.23% (from 77.77% to 100%). This is because the initial test coverage only had lines 55, and 101-119 uncovered, which were the functions copyTo, clone, toString method, equals method for which tests were created, making it realistic to get to 100% coverage.

_TilingSprite.test.ts_  
![image](https://github.com/andrasBencsik/pixijs/assets/122271111/0ad1515f-ef2f-421f-a2c1-da6584a26323)  
>The coverage of the statements has improved by 17.7% (from 82.3% to 94.69%). The branch coverage improved by 13.34% (from 66.66% to 80%). As shown, this is an increase in coverage of the tests, specifically the methods constructor, destroy and clampMargin  




### Overall
**Old coverage:**  
![original-coverage](https://github.com/andrasBencsik/pixijs/assets/122271111/82824dd9-ce9e-4a6a-8a75-5d9a6be39dea)  
**New coverage:**  
![new-coverage](https://github.com/andrasBencsik/pixijs/assets/122271111/33fe62bb-9eda-41df-a186-1098023bd3b0)  


## Statement of individual contributions
**Balint Halacsy:** Improved two files’ coverage, made the readme  
**Tonko Klein:** Added coverage to 2 files that didn’t exist before  
**Andras Bencsik:** Improved the coverage of 2 files in the repository by extending existing tests. Made the custom coverage tool.  
**Shruthikrishna Shaji:** Improved the coverage of 2 files.  
