---
banner: 526772.jpg
---

> [!multi-column]
> > [!abstract] **Preparation**
> > ```dataview
> > List
> > From "Preparation"
> > Sort file.mtime Desc
> > Limit 6
> > ```
> 
> > [!note] **Last Created**
> > ```dataview
> > List
> > From ""
> > Sort file.ctime Desc
> > Limit 6
>>```
>
>> [!note] **Last Edited**
> > ```dataview
> > List
> > From ""
> > Sort file.mtime Desc
> > Limit 6
>>```

>[!multi-column]
> > [!tip] **Important Links**
>> - [[Krah Krah Gang]]
>> - [[Dunmarrow]]
>> - [[Krogmaw Mine]]
>> - 
>> - [[Act 0 - The bar]]
>> - [[Session 3]]
>
> > [!success] **Recent NPCs**
> > ```dataview
> > List
> > From #NPC 
> > Sort file.mtime Desc
> > Limit 6
>>```
>
>> [!faq] **Recent Places**
> > ```dataview
> > List
> > From #Place 
> > Sort file.mtime Desc
> > Limit 6
>>```

> [!multi-column]
>> ![[Nations Influence]]
>
>> ![[Timeline]]

> [!quote] Random Article
> ```dataviewjs
const dir = "World/"
const files = app.vault.getFiles().filter(f => f.path.startsWith(dir))
const random = Math.floor(Math.random() * (files.length - 1)) 
const randomNote = files[random] 
dv.paragraph('[[' + randomNote.basename + ']]') 
dv.paragraph("!" + '[[' + randomNote.basename + ']]') 