## Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/Dejmenek/Todo.Dejmenek.git
   cd Todo.Dejmenek
   ```
2. **Open the project in Visual Studio**  
	- Launch Visual Studio.
	- Open the Todo.Dejmenek.sln solution file from the project directory
3. **Restore dependencies**  
	- In Visual Studio, go to the Tools menu and select NuGet Package Manager > Manage NuGet Packages for Solution.
	- Alternatively, dependencies will be restored automatically when you build the solution. To manually restore NuGet packages: ```dotnet restore```
4. **Set multiple projects to ensure project runs correctly**
	- In Visual Studio, right-click the solution in Solution Explorer and select Configure Startup Projects.
	- Choose multiple startup projects
	- Set the action to Start for the Todo.Dejmenek.Api and Todo.Dejmenek.Web projects.
5. **Build and run the project**  
    - In Visual Studio, press Ctrl + Shift + B to build the project.
    - Then press F5 or click Start to run the project.
