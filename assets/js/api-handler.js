// FR-4.1: Simulate Fetching Courses from Backend
async function fetchCourses() {
    // මේක හරියට Backend එකට කතා කරනවා වගේ වැඩක් (Promise එකක්)
    return new Promise((resolve) => {
        setTimeout(() => {
            // මේවා තමයි Backend එකෙන් එනවා කියලා හිතන දත්ත
            const courses = [
                {
                    title: "Web Development",
                    desc: "Learn HTML, CSS, and JS basics.",
                    progress: 75,
                    color: "bg-primary"
                },
                {
                    title: "Database Systems",
                    desc: "Introduction to SQL and NoSQL.",
                    progress: 40,
                    color: "bg-warning"
                },
                {
                    title: "Software Engineering",
                    desc: "Learn SDLC, Agile, and Scrum.",
                    progress: 10,
                    color: "bg-danger"
                }
            ];
            resolve(courses);
        }, 1500); // තත්පර 1.5 කින් දත්ත එවනවා
    });
}