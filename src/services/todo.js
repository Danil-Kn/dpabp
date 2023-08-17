const service = {
    getDefault() {
        return {
            id: `${Date.now().toString(16)}_${Math.ceil(Math.random() * 1000).toString(16)}`,
            text: "",
            status: "not_started"
        }
    },
    getStatusList() {
        return [
            { id: "not_started", label: "Not started" },
            { id: "in_progress", label: "In progress" },
            { id: "completed", label: "Completed" }
        ]
    },
    validateTodo(item) {
        return item.text.length > 0
    },
    makeCopy(item) {
        return { ...item }
    },
    toggleStatus(status) {
        switch (status) {
            case "not_started":
                return "in_progress"
            case "in_progress":
                return "completed"
            case "completed":
                return "not_started"
        }
    },
    createTodoProject(name = '') {
        let projects = this.loadProjectsManifest()

        // Prepare the new project
        let project_id = projects.next_id


        // Update the projects manifest
        projects.next_id++
        projects.list.push({ id: project_id, name })

        // Create project entry in local storage
        localStorage.setItem(`project.${project_id}`, '[]')

        // Save the projects manifest
        this.saveProjectsManifest(projects)
    },
    loadProjectsManifest() {
        // Check if the master project list exists in localStorage
        let projects = localStorage.getItem('projects')

        // If it doesn't exist, we create a default.otherwise, parse the string
        if (!projects) {
            projects = { next_id: 0, list: [] }
        } else {
            projects = JSON.parse(projects)
        }

        return projects
    },
    saveProjectsManifest(project = {}) {
        localStorage.setItem('projects', JSON.stringify(project))
    },
    deleteProject(project_id) {
        // Retrieve the manifest, and the index of the project in the list
        let manifest = this.loadProjectsManifest(),
            project_index = manifest.list.findIndex(p => p.id === project_id)

        // If the project is found...
        if (project_id > -1) {
            // Remove project from the manifest
            manifest.list.splice(project_index, 1)
            service.saveProjectsManifest(manifest)

            // Delete localStorage
            localStorage.removeItem(`project.${project_id}`)
        }
    },
    loadProject(project_id) {
        // Retrieve the project from localStorage and parse it ro JSON
        return JSON.parse(localStorage.getItem(`project.${project_id}`))
    },
    saveProject(project_id, data) {
        // Store the item as string in localStorage
        localStorage.setItem(`project.${project_id}`, JSON.stringify(data))
    },
    getProjectName(project_id) {
        // Retrieve the project from the manifest and return the name
        let manifest = service.loadProjectsManifest(),
            project = manifest.list.find(p => p.id === project_id)

        return project ? project.name : ''
    }
}

export default service