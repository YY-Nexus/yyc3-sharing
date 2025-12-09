"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Clock, XCircle, AlertTriangle, TrendingUp, Code, Shield, Rocket } from "lucide-react"

// 项目分析数据
const projectData = {
  overview: {
    totalFiles: 156,
    totalLinesOfCode: 28450,
    completionRate: 78,
    lastUpdated: new Date().toLocaleDateString("zh-CN"),
  },
  modules: [
    {
      name: "AI搜索核心",
      completionRate: 95,
      filesCount: 12,
      linesOfCode: 3200,
      issues: ["需要优化搜索算法性能"],
      status: "completed" as const,
    },
    {
      name: "用户认证系统",
      completionRate: 85,
      filesCount: 8,
      linesOfCode: 2100,
      issues: ["微信登录集成待完善", "密码重置功能需测试"],
      status: "in-progress" as const,
    },
    {
      name: "内容生成器",
      completionRate: 90,
      filesCount: 15,
      linesOfCode: 4500,
      issues: ["PPT生成器需要模板优化"],
      status: "completed" as const,
    },
    {
      name: "学习路径管理",
      completionRate: 70,
      filesCount: 6,
      linesOfCode: 1800,
      issues: ["缺少进度跟踪功能", "推荐算法待优化"],
      status: "in-progress" as const,
    },
    {
      name: "社区功能",
      completionRate: 60,
      filesCount: 10,
      linesOfCode: 2200,
      issues: ["评论系统不完整", "内容审核机制缺失"],
      status: "in-progress" as const,
    },
    {
      name: "数据分析",
      completionRate: 75,
      filesCount: 8,
      linesOfCode: 1900,
      issues: ["实时数据展示需优化"],
      status: "in-progress" as const,
    },
    {
      name: "插件系统",
      completionRate: 80,
      filesCount: 5,
      linesOfCode: 1500,
      issues: ["插件安全性验证待加强"],
      status: "in-progress" as const,
    },
    {
      name: "本地LLM集成",
      completionRate: 65,
      filesCount: 7,
      linesOfCode: 1800,
      issues: ["模型管理界面不完整", "性能监控缺失"],
      status: "in-progress" as const,
    },
    {
      name: "PWA支持",
      completionRate: 55,
      filesCount: 4,
      linesOfCode: 800,
      issues: ["Service Worker注册问题", "离线功能不完整"],
      status: "in-progress" as const,
    },
    {
      name: "管理后台",
      completionRate: 40,
      filesCount: 12,
      linesOfCode: 2400,
      issues: ["用户管理功能不完整", "系统监控缺失", "权限控制待完善"],
      status: "in-progress" as const,
    },
  ],
  codeQuality: {
    syntaxErrors: 3,
    duplicateCode: 12,
    unusedVariables: 28,
    securityIssues: 5,
  },
  performance: {
    bundleSize: "2.8MB",
    loadTime: "3.2s",
    memoryUsage: "45MB",
    criticalIssues: ["图片资源未优化", "部分组件未实现懒加载", "数据库查询未优化"],
  },
  testing: {
    coverageRate: 25,
    unitTests: 15,
    integrationTests: 8,
    e2eTests: 3,
  },
  deployment: {
    isReady: false,
    cicdStatus: "部分配置",
    environmentsConfigured: ["development", "staging"],
    issues: ["生产环境配置不完整", "数据库迁移脚本缺失", "监控和日志系统未配置", "备份策略未制定"],
  },
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "in-progress":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "not-started":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    completed: "default",
    "in-progress": "secondary",
    "not-started": "destructive",
  } as const

  const labels = {
    completed: "已完成",
    "in-progress": "进行中",
    "not-started": "未开始",
  }

  return (
    <Badge variant={variants[status as keyof typeof variants] || "outline"}>
      {labels[status as keyof typeof labels] || status}
    </Badge>
  )
}

export default function ProjectAnalysisPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">YYC³ AI智能中心 - 项目分析报告</h1>
          <p className="text-muted-foreground mt-2">全面分析应用开发进度、代码质量和部署状态</p>
        </div>
        <Badge variant="outline" className="text-sm">
          最后更新: {projectData.overview.lastUpdated}
        </Badge>
      </div>

      {/* 总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总体完成度</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.overview.completionRate}%</div>
            <Progress value={projectData.overview.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">文件总数</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.overview.totalFiles}</div>
            <p className="text-xs text-muted-foreground">
              代码行数: {projectData.overview.totalLinesOfCode.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">测试覆盖率</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.testing.coverageRate}%</div>
            <Progress value={projectData.testing.coverageRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">部署状态</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.deployment.isReady ? "就绪" : "未就绪"}</div>
            <p className="text-xs text-muted-foreground">{projectData.deployment.cicdStatus}</p>
          </CardContent>
        </Card>
      </div>

      {/* 详细分析标签页 */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="modules">模块完成度</TabsTrigger>
          <TabsTrigger value="quality">代码质量</TabsTrigger>
          <TabsTrigger value="performance">性能分析</TabsTrigger>
          <TabsTrigger value="testing">测试覆盖</TabsTrigger>
          <TabsTrigger value="deployment">部署状态</TabsTrigger>
        </TabsList>

        {/* 模块完成度 */}
        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>模块开发进度</CardTitle>
              <CardDescription>各功能模块的完成情况和存在问题</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.modules.map((module, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(module.status)}
                        <h3 className="font-semibold">{module.name}</h3>
                        {getStatusBadge(module.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {module.filesCount} 文件 | {module.linesOfCode} 行代码
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>完成度</span>
                        <span>{module.completionRate}%</span>
                      </div>
                      <Progress value={module.completionRate} />
                    </div>

                    {module.issues.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-orange-600">待解决问题:</p>
                        {module.issues.map((issue, issueIndex) => (
                          <p key={issueIndex} className="text-sm text-muted-foreground ml-2">
                            • {issue}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 代码质量 */}
        <TabsContent value="quality" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>代码质量指标</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>语法错误</span>
                  <Badge variant={projectData.codeQuality.syntaxErrors > 0 ? "destructive" : "default"}>
                    {projectData.codeQuality.syntaxErrors}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>重复代码</span>
                  <Badge variant={projectData.codeQuality.duplicateCode > 10 ? "secondary" : "default"}>
                    {projectData.codeQuality.duplicateCode}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>未使用变量</span>
                  <Badge variant={projectData.codeQuality.unusedVariables > 20 ? "secondary" : "default"}>
                    {projectData.codeQuality.unusedVariables}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>安全问题</span>
                  <Badge variant={projectData.codeQuality.securityIssues > 0 ? "destructive" : "default"}>
                    {projectData.codeQuality.securityIssues}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>改进建议</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>高优先级</AlertTitle>
                    <AlertDescription>修复 {projectData.codeQuality.syntaxErrors} 个语法错误</AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>中优先级</AlertTitle>
                    <AlertDescription>处理 {projectData.codeQuality.securityIssues} 个安全问题</AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>低优先级</AlertTitle>
                    <AlertDescription>清理 {projectData.codeQuality.unusedVariables} 个未使用变量</AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 性能分析 */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>包大小</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectData.performance.bundleSize}</div>
                <p className="text-sm text-muted-foreground">建议 &lt; 2MB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>加载时间</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectData.performance.loadTime}</div>
                <p className="text-sm text-muted-foreground">建议 &lt; 3s</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>内存使用</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectData.performance.memoryUsage}</div>
                <p className="text-sm text-muted-foreground">建议 &lt; 50MB</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>性能问题</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projectData.performance.criticalIssues.map((issue, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{issue}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 测试覆盖 */}
        <TabsContent value="testing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>测试统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>单元测试</span>
                  <Badge>{projectData.testing.unitTests}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>集成测试</span>
                  <Badge>{projectData.testing.integrationTests}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>端到端测试</span>
                  <Badge>{projectData.testing.e2eTests}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>覆盖率分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>当前覆盖率</span>
                      <span>{projectData.testing.coverageRate}%</span>
                    </div>
                    <Progress value={projectData.testing.coverageRate} />
                  </div>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>建议</AlertTitle>
                    <AlertDescription>测试覆盖率偏低，建议提升至80%以上</AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 部署状态 */}
        <TabsContent value="deployment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>环境配置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {projectData.deployment.environmentsConfigured.map((env, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="capitalize">{env}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Production (未配置)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CI/CD状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span>{projectData.deployment.cicdStatus}</span>
                  </div>
                  <Badge variant={projectData.deployment.isReady ? "default" : "destructive"}>
                    {projectData.deployment.isReady ? "部署就绪" : "未就绪"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>部署问题</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projectData.deployment.issues.map((issue, index) => (
                  <Alert key={index}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{issue}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 总结和建议 */}
      <Card>
        <CardHeader>
          <CardTitle>总结与建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">✅ 已完成的亮点</h3>
              <ul className="space-y-1 text-sm">
                <li>• AI搜索核心功能基本完善</li>
                <li>• 内容生成器功能丰富</li>
                <li>• 用户认证系统基本可用</li>
                <li>• 插件系统架构清晰</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-600 mb-2">⚠️ 需要改进的方面</h3>
              <ul className="space-y-1 text-sm">
                <li>• 提高测试覆盖率至80%以上</li>
                <li>• 完善生产环境部署配置</li>
                <li>• 优化性能和包大小</li>
                <li>• 完善管理后台功能</li>
                <li>• 加强安全性和错误处理</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
