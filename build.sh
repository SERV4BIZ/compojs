#!/bin/sh

NAMEARM="compojs.arm"
NAMELINUX="compojs.linux"
NAMEFREEBSD="compojs.freebsd"
NAMEWINDOWS="compojs.windows"
NAMEDARWIN="compojs.darwin"

rm -f $NAMEARM
export GOOS=linux
export GOARCH=arm64
go build -o $NAMEARM

rm -f $NAMELINUX
export GOOS=linux
export GOARCH=amd64
go build -o $NAMELINUX

export GOOS=freebsd
export GOARCH=amd64
rm -f $NAMEFREEBSD
go build -o $NAMEFREEBSD

export GOOS=windows
export GOARCH=amd64
rm -f $NAMEWINDOWS
go build -o $NAMEWINDOWS

export GOOS=darwin
export GOARCH=amd64
rm -f $NAMEDARWIN
go build -o $NAMEDARWIN