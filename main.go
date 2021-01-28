package main

import (
	"bytes"
	"fmt"
	"os"
	"strings"

	"./utility"

	"github.com/SERV4BIZ/gfp/files"
	"github.com/SERV4BIZ/gfp/handler"
	"github.com/SERV4BIZ/gfp/jsons"

	minify "github.com/tdewolff/minify"
)

var m *minify.M

var jsoBundleLangs *jsons.JSONObject = jsons.JSONObjectFactory()
var jsoBundleCompos *jsons.JSONObject = jsons.JSONObjectFactory()
var jsoBundle *jsons.JSONObject = jsons.JSONObjectFactory()

//Minify is compress script code
func Minify(exttype string, buffer []byte) ([]byte, error) {
	return buffer, nil

	/*if m == nil {
		m = minify.New()
		m.AddFunc("text/css", minify_css.Minify)
		m.AddFunc("text/html", minify_html.Minify)
		m.AddFunc("image/svg+xml", minify_svg.Minify)
		m.AddFuncRegexp(regexp.MustCompile("^(application|text)/(x-)?(java|ecma)script$"), minify_js.Minify)
		m.AddFuncRegexp(regexp.MustCompile("[/+]json$"), minify_json.Minify)
		m.AddFuncRegexp(regexp.MustCompile("[/+]xml$"), minify_xml.Minify)
	}

	if exttype == "css" {
		return m.Bytes("text/css", buffer)
	} else if exttype == "html" {
		return m.Bytes("text/html", buffer)
	} else if exttype == "svg" {
		return m.Bytes("image/svg+xml", buffer)
	} else if exttype == "js" {
		return m.Bytes("application/javascript", buffer)
	} else if exttype == "json" {
		return m.Bytes("application/json", buffer)
	} else if exttype == "xml" {
		return m.Bytes("text/xml", buffer)
	}
	return buffer, errors.New("Minify format is not support")*/
}

// CompileCompos is compile compos all and add to jsoBundleCompos object
func CompileCompos(pathfile string) {
	filedirs, err := files.ScanDir(pathfile)
	handler.Panic(err)

	for _, name := range filedirs {
		pathitem := fmt.Sprint(pathfile, "/", name)

		if files.IsDir(pathitem) {
			pathStyle := fmt.Sprint(pathitem, "/style.css")
			pathView := fmt.Sprint(pathitem, "/view.html")
			pathCode := fmt.Sprint(pathitem, "/code.js")
			pathobject := fmt.Sprint(pathitem, "/compo.obj")
			isCompo := false

			buff := new(bytes.Buffer)
			if files.ExistFile(pathStyle) {
				b, err := files.ReadFile(pathStyle)
				handler.Panic(err)

				mini, _ := Minify("css", b)
				b = mini
				buff.WriteString("<style>")
				buff.Write(b)
				buff.WriteString("</style>")
				isCompo = true
			}

			if files.ExistFile(pathView) {
				b, err := files.ReadFile(pathView)
				handler.Panic(err)

				mini, _ := Minify("html", b)
				b = mini
				buff.Write(b)
				isCompo = true
			}

			if files.ExistFile(pathCode) {
				b, err := files.ReadFile(pathCode)
				handler.Panic(err)

				mini, _ := Minify("js", b)
				b = mini
				buff.WriteString("<script>")
				buff.WriteString("var $_this = compojsObject[\"$_\"];")
				buff.WriteString("var $_parent = $_this.parent;")
				buff.Write(b)
				buff.WriteString("$(document).ready(function(){$_this.call(\"ready\",$_this.pmts);delete compojsObject[\"$_\"];});")
				buff.WriteString("</script>")
				isCompo = true
			} else {
				buff.WriteString("<script>")
				buff.WriteString("$(document).ready(function(){delete compojsObject[\"$_\"];});")
				buff.WriteString("</script>")
			}

			if isCompo {
				files.WriteFile(pathobject, buff.Bytes())
				fmt.Println(pathitem)

				// Add to bundle
				basepath := fmt.Sprint(utility.GetAppDir(), "/compos")
				bundlepath := strings.ToLower(strings.Trim(strings.ReplaceAll(pathitem, basepath, ""), "/"))
				jsoBundleCompos.PutString(bundlepath, buff.String())
			}
			CompileCompos(pathitem)
		}
	}
}

// CompileLangs is compile all langs all and add to jsoBundleLangs object
func CompileLangs(pathfile string) {
	files, err := files.ScanDir(pathfile)
	handler.Panic(err)

	for _, name := range files {
		pathitem := fmt.Sprint(pathfile, "/", name)

		// Add to bundle
		bundlepath := strings.ToLower(strings.ReplaceAll(strings.ToLower(name), ".json", ""))
		buff, err := jsons.JSONObjectFromFile(pathitem)
		handler.Panic(err)

		jsoBundleLangs.PutObject(bundlepath, buff)
	}
}

// CompileJs is minify compress javascript
func CompileJs(buffer *bytes.Buffer, pathFile string) {
	b, err := files.ReadFile(pathFile)
	handler.Panic(err)

	mini, _ := Minify("js", b)
	b = mini
	buffer.Write(b)
}

func main() {
	Args := os.Args
	ProjectName := "CompoJS"
	ProjectVersion := "1.0.0"
	CompanyName := "SERV4BIZ CO.,LTD."

	isCompileLib := false
	if len(Args) > 1 {
		for _, value := range Args {
			if strings.ToLower(value) == "lib" {
				isCompileLib = true
			}
		}
	}

	fmt.Println("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *")
	fmt.Println(fmt.Sprint(ProjectName, " Version ", ProjectVersion))
	fmt.Println(fmt.Sprint("Copyright © 2020 ", CompanyName, " All Rights Reserved."))
	fmt.Println("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *")
	fmt.Println(fmt.Sprint("Directory : ", utility.GetAppDir()))
	fmt.Println("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *")
	fmt.Println("Begin Components Compiling")
	fmt.Println("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *")
	pathfile := fmt.Sprint(utility.GetAppDir(), "/compos")
	CompileCompos(pathfile)

	pathfile = fmt.Sprint(utility.GetAppDir(), "/langs")
	CompileLangs(pathfile)
	fmt.Println("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *")

	pathfile = fmt.Sprint(utility.GetAppDir(), "/compojs.bundle.json")
	jsoBundle.PutObject("jso_langs", jsoBundleLangs)
	jsoBundle.PutObject("jso_compos", jsoBundleCompos)
	txtBundle := jsoBundle.ToString()

	// Load bundle json file
	readyCode := `
	$(document).ready(function(){
		compojsGlobal["obj_bundle"] = ` + txtBundle + `;
		if(Utility.isset(window,"compojsReady")){
			compojsReady();
		}
	});`

	mini, _ := Minify("js", []byte(strings.TrimSpace(readyCode)))
	pathfile = fmt.Sprint(utility.GetAppDir(), "/compojs.app.js")
	_, err := files.WriteFile(pathfile, []byte(string(mini)))
	handler.Panic(err)

	if isCompileLib {
		buffer := new(bytes.Buffer)

		// Compile vendor libraries
		jsaVenders := jsons.JSONArrayFactory()
		jsaVenders.PutString("assets/js/lib/localforage.min.js")
		jsaVenders.PutString("assets/js/lib/tocca.min.js")
		jsaVenders.PutString("assets/js/lib/jquery-3.5.1.min.js")
		jsaVenders.PutString("assets/js/lib/jquery.cookie-1.4.1.min.js")
		jsaVenders.PutString("assets/js/lib/jquery.tocca.js")
		jsaVenders.PutString("assets/js/lib/screenfull.min.js")
		jsaVenders.PutString("assets/js/lib/moment.min.js")
		jsaVenders.PutString("assets/js/lib/sha256.min.js")
		jsaVenders.PutString("assets/js/lib/md5.min.js")
		jsaVenders.PutString("assets/js/lib/clipboard-polyfill.js")

		for i := 0; i < jsaVenders.Length(); i++ {
			pathLibFile := fmt.Sprint(utility.GetAppDir(), "/", jsaVenders.GetString(i))
			CompileJs(buffer, pathLibFile)
			buffer.WriteString("\n")
		}
		// End of compile venders

		pathLib := fmt.Sprint(utility.GetAppDir(), "/libs")
		filedirs, errScan := files.ScanDir(pathLib)
		if errScan != nil {
			panic(errScan)
		}

		for _, fileName := range filedirs {
			pathjs := fmt.Sprint(pathLib, "/", fileName)
			CompileJs(buffer, pathjs)
			buffer.WriteString("\n")
		}

		pathfile = fmt.Sprint(utility.GetAppDir(), "/compojs.lib.js")
		_, err := files.WriteFile(pathfile, buffer.Bytes())
		handler.Panic(err)
	}

	fmt.Println(fmt.Sprint(ProjectName, " Finished"))
	fmt.Println("* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *")
}
