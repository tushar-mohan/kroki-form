# Kroki Form UI

A simple, self-hosted web interface for the powerful [Kroki](https://kroki.io) diagramming service. This project provides an easy-to-use form for visualizing diagrams without needing to interact directly with the API.

## What This Adds on Top of Kroki

The standard Kroki image provides a powerful API, but it doesn't come with a user-facing frontend. This project builds on top of Kroki to provide a complete, user-friendly solution that you can run locally with a single command.

Key features added by this project:
*   **A Simple Web Form:** An intuitive UI with a dropdown menu to select the diagram type.
*   **Dual Input Methods:** Seamlessly handles both text-based diagrams (like PlantUML, Mermaid) and file-based diagrams (like `diagrams.net`). The form prioritizes file uploads if a file is selected.
*   **Multiple Diagram Support:** The dropdown is populated with the full list of diagram types supported by Kroki.
*   **Pre-configured Gateway:** The setup correctly configures the main Kroki service to act as a gateway, delegating to a companion container for `diagrams.net` while using its own internal renderers for others like PlantUML and Graphviz.
*   **One-Command Setup:** Using Docker Compose, the entire stack (the Kroki service, its companion, and the Nginx web frontend) is orchestrated and launched with a single command.

## Prerequisites

You must have the following software installed on your machine:
*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1.  **Obtain the Project Files**
    Make sure you have the complete project structure on your local machine.

2.  **Navigate to the Project Directory**
    Open your terminal and navigate into the project's root directory:
    ```bash
    cd kroki-form
    ```

3.  **Build and Run the Services**
    From the root of the project directory, run the following command. This will pull the necessary Docker images, build the web frontend, and start all the services.

    ```bash
    docker-compose up --build
    ```
    The first time you run this command, it may take a few minutes to download all the container images. Subsequent launches will be much faster. To run the services in the background, you can add the `-d` flag: `docker-compose up --build -d`.

4.  **Access the Application**
    Open your web browser and navigate to:
    [http://localhost:8080](http://localhost:8080)

5.  **Stopping the Services**
    To stop all running containers, go to the terminal where `docker-compose` is running and press `Ctrl+C`. If you ran it in the background, use the command `docker-compose down`.

## How to Use

The interface provides two ways to generate a diagram:

#### For Text-Based Diagrams (PlantUML, Mermaid, Graphviz, etc.)

1.  Select the desired diagram type from the dropdown menu.
2.  Paste your source code into the "Source Code" textarea.
3.  Click the "Visualize" button.

#### For File-Based Diagrams (Diagrams.net / draw.io)

1.  Select "Diagrams.net (draw.io)" from the dropdown menu.
2.  Click the "Choose File" button and select your `.drawio` file.
3.  Click the "Visualize" button.

> **Note:** The application will always prioritize the file upload. If a file is selected, the content of the textarea will be ignored.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

This project builds upon the fantastic [kroki](https://kroki.io) project.

## Caveats

Some of the external diagramming services provided by kroki may not work
with our form yet. These external services require containers to be added
to the `docker-compose.yml`. That's a work-in-progress.
