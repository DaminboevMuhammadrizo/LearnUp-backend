#LMS(Learning Management System) loyihasi

## Ma'lumotlar bazasi strukturasi

### types
```
UserRole = ADMIN | MENTOR | ASSISTANT | STUDENT

CourseLevel = BEGINNER | PRE_INTERMEDIATE | INTERMEDIATE | UPPER_INTERMEDIATE | ADVANCED

PaidVia = PAYME | CLICK | CASH

HomeworkSubStatus = PENDING | APPROVED | REJECTED

ExamAnswer = variantA | variantB | variantC | variantD

```

### Users jadval
```
    id SERIAL NOT NULL,
    phone TEXT NOT NULL,
    password TEXT NOT NULL,
    role "UserRole" NOT NULL DEFAULT 'STUDENT',
    fullName TEXT NOT NULL,
    image TEXT,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
```
### MentorProfile
```
    "id" SERIAL NOT NULL,
    "about" TEXT,
    "job" TEXT,
    "experience" INTEGER NOT NULL,
    "telegram" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "facebook" TEXT,
    "github" TEXT,
    "website" TEXT,
     user_id: serial FOREIGN KEY REFERENCES users(id)
```
### CourseCategory 
```
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```
### Course
```
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    about TEXT NOT NULL,
    price DECIMAL NOT NULL,
    banner TEXT NOT NULL,
    introVideo TEXT,
    level "CourseLevel" NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    categoryId INTEGER NOT NULL,
    mentorId INTEGER NOT NULL,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE CASCADE,
    FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE CASCADE
```
### AssignedCourse
```
    userId INTEGER NOT NULL,
    courseId UUID NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE
```
### PurchasedCourse
```
    courseId UUID NOT NULL,
    userId INTEGER NOT NULL,
    amount DECIMAL,
    paidVia "PaidVia" NOT NULL,
    purchasedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
```
### Rating
```
    id SERIAL PRIMARY KEY,
    rate INTEGER NOT NULL,
    comment TEXT NOT NULL,
    courseId UUID NOT NULL,
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id")
```
### LastActivity
```
    id SERIAL PRIMARY KEY,
    userId INTEGER UNIQUE NOT NULL,
    courseId UUID,
    groupId INTEGER,
    lessonId UUID,
    url TEXT, 
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES "Course"("id"),
    FOREIGN KEY ("groupId") REFERENCES "LessonGroup"("id"),
    FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id")
```
### LessonBo'lim
```
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    courseId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("courseId") REFERENCES "Course"("id")
```
### Lesson
```
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    about TEXT NOT NULL,
    video TEXT NOT NULL,
    bolimId INTEGER NOT NULL,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("groupId") REFERENCES "LessonGroup"("id")
```
### LessonView
```
    lessonId UUID NOT NULL,
    userId INTEGER NOT NULL,
    view BOOLEAN NOT NULL,

    FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
```
### LessonFile
```
    id SERIAL PRIMARY KEY,
    file TEXT NOT NULL,
    note TEXT,
    lessonId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE
```
### Homework
```
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    file TEXT,
    lessonId UUID UNIQUE NOT NULL,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE    ON UPDATE CASCADE
```
### HomeworkSubmission
```
    id SERIAL PRIMARY KEY,
    text TEXT,
    file TEXT NOT NULL,
    reason TEXT,
    status "HomeworkSubStatus" DEFAULT 'PENDING',
    homeworkId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("homeworkId") REFERENCES "Homework"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```
### Exam
```
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    variantA TEXT NOT NULL,
    variantB TEXT NOT NULL,
    variantC TEXT NOT NULL,
    variantD TEXT NOT NULL,
    answer "ExamAnswer" NOT NULL,
    lessonBolimId INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("lessonGroupId") REFERENCES "LessonGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE
```
### ExamResult
```
    id SERIAL PRIMARY KEY,
    lessonGroupId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    corrects INTEGER NOT NULL,
    wrongs INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY ("lessonGroupId") REFERENCES "LessonGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```
### Question
```
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    courseId TEXT NOT NULL,
    text TEXT NOT NULL,
    file TEXT,
    read BOOLEAN DEFAULT FALSE,
    readAt TIMESTAMP,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
    CONSTRAINT "Question_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE
```
### QuestionAnswer
```
    id SERIAL PRIMARY KEY,
    questionId INTEGER UNIQUE NOT NULL,
    userId INTEGER NOT NULL,
    text TEXT NOT NULL,
    file TEXT,
    updatedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE,
    CONSTRAINT "QuestionAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
```

## Endpointlar



